class Car < ApplicationRecord
    has_many :rentals, dependent: :restrict_with_error
    validates :plate, :car_type, :year, presence: true
    validates :plate, length: { minimum: 4, maximum: 9 }
    validates :year, length: { is: 4 }, numericality: { only_integer:true }
end
