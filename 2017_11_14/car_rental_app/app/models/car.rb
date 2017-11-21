class Car < ApplicationRecord
    validates :plate, :car_type, :year, presence: true
    has_many :rentals
end
