class RentalsController < ApplicationController
    def index
        @rentals = Rental.all
    end
    
    def show
        @rental = Rental.find(params[:id])
    end

    def new
        @rental = Rental.new
        @rental.start_date = Time.now
        @rental.end_date = Time.now + 1.days
        @available_cars = get_available_cars
    end

    def edit
        @rental = Rental.find(params[:id])
        @available_cars = get_available_cars
        @available_cars.push(Car.find(@rental.car_id))
    end

    def create
        @rental = Rental.new(rental_params)
        
        if @rental.save
            redirect_to @rental
            flash[:notice] = "Created rental successfully!"
        else
            @available_cars = get_available_cars
            render 'new'
        end
    end

    def update
        @rental = Rental.find(params[:id])
        
        if @rental.update(rental_params)
            redirect_to @rental
            flash[:notice] = "Updated rental successfully!"
        else
            @available_cars = get_available_cars
            @available_cars.push(Car.find(@rental.car_id))
            render 'edit'
        end
    end

    def destroy
        @rental = Rental.find(params[:id])
        redirect_to rentals_path
        if @rental.destroy
            flash[:notice] = "Deleted rental successfully!"
        else
            flash[:alert] = @rental.errors.full_messages[0]
        end 
    end
    
    private
    def rental_params
        params.require(:rental).permit(:client_id, :car_id, :start_date, :end_date)
    end

    def get_available_cars
        return Car.all - Car.all.joins(:rentals).where('rentals.end_date > ?', Date.today)
    end
end