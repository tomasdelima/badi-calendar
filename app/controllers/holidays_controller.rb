class HolidaysController < ApplicationController
  def index
    render json: (Holiday.where("date < ?", Date.new(2064, 1, 1)).map do |h|
      badi_date = h.to_badi
      {
        id: h.id,
        date: h.date,
        name: h.name,
        year: badi_date.year,
        month: badi_date.month,
        day: badi_date.day
      }
    end.to_json)
  end
end
