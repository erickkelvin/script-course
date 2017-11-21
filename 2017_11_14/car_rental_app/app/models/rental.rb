class Rental < ApplicationRecord
  belongs_to :client
  belongs_to :car
  validates :client_id, :car_id, :start_date, presence: true
  validate :end_date_later_start_date?
  
  def end_date_later_start_date?
    if end_date <= start_date
      errors.add :end_date, "must be later than start date"
    end
  end
end
