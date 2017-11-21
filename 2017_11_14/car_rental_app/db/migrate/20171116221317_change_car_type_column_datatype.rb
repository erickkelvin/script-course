class ChangeCarTypeColumnDatatype < ActiveRecord::Migration[5.0]
  def change
    change_column :cars, :car_type, :string
  end
end
