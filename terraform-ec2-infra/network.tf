# ec2 instance network configuration
resource "aws_security_group" "traffic_rules" {
  name        = "Internet_access_rules"
  description = "Allow inbound traffic rules and all outbound traffic"

  tags = {
    Name = "Internet_access_rules"
  }
}

# ingress (inbound rules)
resource "aws_vpc_security_group_ingress_rule" "inbound_rules" {
  count             = length(var.ingress_ports)
  security_group_id = aws_security_group.traffic_rules.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "tcp"
  from_port         = element(var.ingress_ports, count.index)
  to_port           = element(var.ingress_ports, count.index)

  tags = {
    Name = "Inbound-rules"
  }
}

# egress (outbound rules)
resource "aws_vpc_security_group_egress_rule" "outbound_rules" {
  security_group_id = aws_security_group.traffic_rules.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1" # semantically equivalent to all ports

  tags = {
    Name = "Outbound-rules"
  }
}