class Client < ApplicationRecord
    has_many :rentals, dependent: :restrict_with_error
    validates :name, :address, :cpf, :rg, presence: true, length: { minimum: 5 }
    validates :name, length: { maximum: 50 }
    validates :address, length: { maximum: 80 }
    validates :rg, length: { maximum: 20 }
    validates :cpf, length: { is: 11 }
    validates :cpf, :rg, numericality: { only_integer:true }
end
