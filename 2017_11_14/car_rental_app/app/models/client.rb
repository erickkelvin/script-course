class Client < ApplicationRecord
    validates :name, :address, :cpf, :rg, presence: true, length: { minimum: 5 }
    has_many :rentals
end
