class CarsController < ApplicationController
    def index
        @cars = Car.all
    end
    
    def show
        @car = Car.find(params[:id])
    end

    def new
        @car = Car.new
    end

    def edit
        @car = Car.find(params[:id])
    end

    def create
        @car = Car.new(car_params)
        
        if @car.save
            redirect_to @car
        else
            render 'new'
        end
    end

    def update
        @car = Car.find(params[:id])
        
        if @car.update(car_params)
            redirect_to @car
        else
            render 'edit'
        end
    end

    def destroy
        @car = Car.find(params[:id])
        @car.destroy
       
        redirect_to cars_path
    end
    
    private
    def car_params
        params.require(:car).permit(:plate, :car_type, :year)
    end
end
