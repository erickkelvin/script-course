class Car < ApplicationRecord
    validates :plate, :car_type, :year, presence: true
    validates :year, length: { is: 4 }, numericality: { only_integer:true }
    has_many :rentals
end
