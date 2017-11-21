class ChangeStartEndDateColumns < ActiveRecord::Migration[5.0]
  def change
    rename_column :rentals, :date_start, :start_date
    rename_column :rentals, :date_end, :end_date
    change_column :rentals, :start_date, :date
    change_column :rentals, :end_date, :date
  end
end
