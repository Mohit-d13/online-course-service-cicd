data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]

  filter {
    name   = "name"
    values = [var.ubuntu_name]
  }

  filter {
    name   = "root-device-type"
    values = ["ebs"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

resource "aws_instance" "app_server" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.instance_type
  key_name               = var.instance_key
  vpc_security_group_ids = [aws_security_group.traffic_rules.id]

  tags = {
    Name = var.instance_name
  }
}

resource "local_file" "create_inventory" {
  depends_on = [aws_instance.app_server]
  content    = <<-EOF
  [app_server]
  ${aws_instance.app_server.public_ip} ansible_user=ubuntu
  EOF
  filename   = "/home/mohit-d13/Projects/course-platform/ansible-plays/inventory.ini"
}