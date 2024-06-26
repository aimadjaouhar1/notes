
variable AWS_SECRET_ACCESS_KEY {}
variable AWS_ACCESS_KEY_ID {}
variable AWS_REGION {}
variable KEY_NAME {}
variable ROUTE53_ZONE_ID{}
variable DOMAIN_NAME {}
variable WORK_DIR {}
variable DOCKER_HUB_USERNAME {}
variable DOCKER_HUB_PASSWORD {}
variable CI_ENV { default = false }

provider "aws" {
  region  = var.AWS_REGION
  access_key = var.AWS_ACCESS_KEY_ID
  secret_key = var.AWS_SECRET_ACCESS_KEY
}

terraform {
  
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "5.32.1"
    }
  }

  # backend "s3" {
  #   bucket = "notes-1-tfstate"
  #   key = "state/terraform.tfstate"
  #   region = "us-east-1"
  #   encrypt = true
  #   dynamodb_table = "notes-1_tf_lockid"
  #   shared_credentials_file = "../.aws/credentials"
  #   profile = "notes"
  #   skip_credentials_validation = true
  # }
}



resource "tls_private_key" "rsa4096" {
  algorithm = "RSA"
  rsa_bits = 4096
}


resource "aws_key_pair" "key_pair" {
    key_name = var.KEY_NAME
    public_key = tls_private_key.rsa4096.public_key_openssh
}

resource "local_file" "private_key" {
    content = tls_private_key.rsa4096.private_key_pem
    filename = "${var.WORK_DIR}/ansible/playbooks/${var.KEY_NAME}"

    provisioner "local-exec" {
        command = "chmod 400 ${var.WORK_DIR}/ansible/playbooks/${var.KEY_NAME}"
    }
}

resource "aws_security_group" "notes_ec2_group" {
  name = "notes_ec2_group"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "public_instance" {
    ami = "ami-008fe2fc65df48dac"
    instance_type = "t3.micro"
    key_name = aws_key_pair.key_pair.key_name
    vpc_security_group_ids = [aws_security_group.notes_ec2_group.id]

    tags = {
      name = "public_instance"
    }

    root_block_device {
        volume_size = 8
        volume_type = "gp2"
    }

    provisioner "local-exec" {
        command = "touch ${var.WORK_DIR}/ansible/playbooks/inventory.ini"
    }
}

resource "aws_route53_record" "record_1" {
  zone_id = var.ROUTE53_ZONE_ID
  name    = var.DOMAIN_NAME
  type    = "A"
  ttl     = 300
  records = [aws_instance.public_instance.public_ip]
}

resource "aws_route53_record" "record_2" {
  zone_id = var.ROUTE53_ZONE_ID
  name    = "www.${var.DOMAIN_NAME}"
  type    = "CNAME"
  ttl     = 300
  records = [var.DOMAIN_NAME]
}

data "template_file" "inventory" {
  template = <<-EOT
    [ec2_instances]
    ${aws_instance.public_instance.public_ip} ansible_user=ubuntu ansible_private_key_file=${var.WORK_DIR}/ansible/playbooks/${var.KEY_NAME}
    EOT
}

resource "local_file" "inventory" {
  depends_on = [aws_instance.public_instance]

  filename = "${var.WORK_DIR}/ansible/playbooks/inventory.ini"
  content  = data.template_file.inventory.rendered

  provisioner "local-exec" {
    command = "chmod 400 ${local_file.inventory.filename}"
  }
}

resource "null_resource" "run_ansible" {
  count = var.CI_ENV ? 0 : 1
  depends_on = [local_file.inventory]

  provisioner "local-exec" {
    command = "ansible-playbook -i ${var.WORK_DIR}/ansible/playbooks/inventory.ini ${var.WORK_DIR}/ansible/playbooks/deploy.yml --ssh-common-args='-o StrictHostKeyChecking=no -o ConnectTimeout=15 -o ConnectionAttempts=4' --extra-vars 'docker_hub_username=${var.DOCKER_HUB_USERNAME} docker_hub_password=${var.DOCKER_HUB_PASSWORD}' "
    working_dir = path.module
  }
}
