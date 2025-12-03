variable "ubuntu_name" {
  type        = string
  description = "Offical image name of the ubuntu ami"
  default     = "ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-server-*"
}

variable "instance_key" {
  type        = string
  description = "Name of the aws ssh key pair."
}

variable "instance_type" {
  type        = string
  description = "Name of EC2 instance type."
}

variable "instance_name" {
  type        = string
  description = "Name of the aws EC2 instance."
}

variable "ingress_ports" {
  type        = list(number)
  description = "Allowed inbound ports for internet access."
}
