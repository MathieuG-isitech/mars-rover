terraform {
    required_providers {
        docker = {
            source = "kreuzwerker/docker"
        }
    }
}

provider "docker" {}

resource "docker_image" "nginx" {
    name = "nginx:latest"
}

resource "docker_container" "web" {
    image = docker_image.nginx.image_id
    name = "web-container"
    ports {
        internal = 80
        external = 8000
    }
}

resource "docker_image" "db" { 
    name = "mysql:8.0"
}

resource "docker_container" "db" {
    image = docker_image.db.image_id
    name = "mars-db"
    env = [
        "MYSQL_ROOT_PASSWORD=",
    ]
    networks_advanced {
        name = docker_network.mars_net.name
    }
}

resource "docker_network" "mars_net" {
    name = "mars-network"
}
    
