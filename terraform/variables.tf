variable "proxmox_api_url" {
  type = string
  default = "https://192.168.1.100:8006/api2/json" # Tukar IP ni
}

variable "proxmox_api_token_id" {
  type = string
  sensitive = true
}

variable "proxmox_api_token_secret" {
  type = string
  sensitive = true
}

variable "proxmox_node" {
  type = string
  default = "pve"
}

variable "template_name" {
  type = string
  default = "ubuntu-cloud-template"
}

variable "ssh_public_key" {
  type = string
  description = "Public SSH Key kau (dari laptop windows)"
}
