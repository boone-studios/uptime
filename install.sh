#!/bin/bash

NODE_VERSION=6.9.1
NPM_VERSION=4.0.1

# Save script's current directory
DIR="$( cd -P "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
#cd "${DIR}"

#
# Check if Homebrew is installed
#
which -s brew
if [[ $? != 0 ]] ; then
    # Install Homebrew
    # https://github.com/mxcl/homebrew/wiki/installation
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
else
    brew update
fi

#
# Check if Git is installed
#
which -s git || brew install git

#
# Check if Node is installed and at the right version
#
echo "Checking for Node version ${NODE_VERSION}"
node --version | grep ${NODE_VERSION}
if [[ $? != 0 ]] ; then
    # Install Node
    cd `brew --prefix`
    $(brew versions node | grep ${NODE_VERSION} | cut -c 16- -)
    brew install node

    # Reset Homebrew formulae versions
    git reset HEAD `brew --repository` && git checkout -- `brew --repository`
fi

#
# Check if Node Package Manager is installed and at the right version
#
echo "Checking for NPM version ${NPM_VERION}"
npm --version | grep ${NPM_VERSION}
if [[ $? != 0 ]] ; then
    echo "Downloading npm"
    curl -L https://www.npmjs.com/install.sh | sh
fi

# Install node packages
npm install
which -s http-console || npm install -g http-console

#
# MongoDB
#
which -s mongo || brew install mongodb
echo "Creating Mongo datastore directory at /data/db, you may be asked for your administrator password"
if [[ ! -d /data/db/ ]]; then
    sudo mkdir -p /data/db/
    sudo chown `id -u` /data/db
fi
if [[ ! -d /data/dumps/ ]]; then
    sudo mkdir -p /data/dumps/
    sudo chown `id -u` /data/dumps
fi

# Get everything set up for the end user
ps -ef | grep mongod | awk '{print$2}' | xargs kill {}
echo
echo "You can start up your local mongodb instance by simply typing 'mongod' in terminal."
echo "Connect to Mongo using the shell by typing 'mongo uptime' in another terminal."
if [[ ! -f ~/.mongorc.js ]]; then
    # Customize the mongo prompt to show what database you're connected to
    echo "prompt = function () { return db+'> '; }" > ~/.mongorc.js
fi
