class ClientsController < ApplicationController
    def index
        @clients = Client.all
    end
    
    def show
        @client = Client.find(params[:id])
    end

    def new
        @client = Client.new
    end

    def edit
        @client = Client.find(params[:id])
    end

    def create
        @client = Client.new(client_params)
        
        if @client.save
            redirect_to @client
            flash[:notice] = "Created client successfully!"
        else
            render 'new'
        end
    end

    def update
        @client = Client.find(params[:id])
        
        if @client.update(client_params)
            redirect_to @client
            flash[:notice] = "Updated client successfully!"
        else
            render 'edit'
        end
    end

    def destroy
        @client = Client.find(params[:id])
        redirect_to clients_path
        if @client.destroy
            flash[:notice] = "Deleted client successfully!"
        else
            flash[:alert] = @client.errors.full_messages[0]
        end 
    end
    
    private
    def client_params
        params.require(:client).permit(:name, :address, :cpf, :rg)
    end
end
