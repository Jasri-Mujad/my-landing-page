terraform {
  required_providers {
    proxmox = {
      source = "telmate/proxmox"
      version = "2.9.11"
    }
  }
}

provider "proxmox" {
  # URL Proxmox kau (https://IP:8006/api2/json)
  pm_api_url = var.proxmox_api_url
  
  # API Token (User@Realm!TokenName)
  pm_api_token_id = var.proxmox_api_token_id
  
  # Secret Key
  pm_api_token_secret = var.proxmox_api_token_secret
  
  # Ignore SSL error (sebab self-signed cert)
  pm_tls_insecure = true
}

resource "proxmox_vm_qemu" "jasri_server" {
  # Node name (contoh: pve)
  target_node = var.proxmox_node
  
  # Nama VM nanti
  name        = "jasri-server-vm"
  desc        = "Landing Page Server - Provisioned by Terraform"
  
  # Template yang kita akan clone (PENTING! Kena create dulu manual)
  clone       = var.template_name
  
  # Basic Settings
  agent       = 1
  os_type     = "cloud-init"
  cores       = 2
  sockets     = 1
  cpu         = "host"
  memory      = 4096

  # Disk Setup
  disk {
    size = "25G"
    type = "scsi"
    storage = "local-lvm"
  }

  # Network Setup
  network {
    model = "virtio"
    bridge = "vmbr0"
  }

  # Cloud-Init config (User & SSH Key)
  # User akan auto-create: 'jasri'
  ciuser     = "jasri"
  cipassword = "password123"
  sshkeys    = <<EOF
  ${var.ssh_public_key}
  EOF

  # IP Address (DHCP)
  ipconfig0 = "ip=dhcp"
}
