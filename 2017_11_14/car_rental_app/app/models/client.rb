class Client < ApplicationRecord
    validates :name, :address, :cpf, :rg, presence: true, length: { minimum: 5 }
    validates :cpf, length: { is: 11 }
    validates :cpf, :rg, numericality: { only_integer:true }
    has_many :rentals
end
