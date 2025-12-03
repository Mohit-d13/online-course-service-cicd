terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.92"
    }
  }

  required_version = ">= 1.2"
}

provider "aws" {
  shared_config_files      = ["/home/mohit-d13/.aws/config"]
  shared_credentials_files = ["/home/mohit-d13/.aws/credentials"]
  region                   = "ap-south-1"
}