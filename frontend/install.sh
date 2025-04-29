#!/bin/bash

# Atualiza o gerenciador de pacotes
echo "Atualizando o gerenciador de pacotes..."
npm install -g npm

# Instala as dependências do projeto
echo "Instalando dependências do projeto..."
npm install

# Instala o Bootstrap
echo "Instalando Bootstrap..."
npm install bootstrap
echo "Instalando routerdon..."
npm install react-router-dom bootstrap-icons
echo "Instalação concluída!"