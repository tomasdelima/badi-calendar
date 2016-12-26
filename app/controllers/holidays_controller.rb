class HolidaysController < ApplicationController
  def index
    @holidays = Holiday.where("date < ?", Date.new(2064, 1, 1))
    if params[:last_updated_at]
      holidaysWithDate
    else
      holidaysWithoutDate
    end
  end

  private

  def holidaysWithDate
    @holidays = @holidays.where("updated_at > '#{params[:last_updated_at]}'")
    holidaysToObject
    render json: {time: Time.now.utc, data: @holidays.to_json}
  end

  def holidaysWithoutDate
    holidaysToObject
    render json: @holidays.to_json
  end

  def holidaysToObject
    @holidays = @holidays.map do |holiday|
      begin
        badi_date = holiday.to_badi
        {
          id: holiday.id,
          date: holiday.date,
          name: holiday.name,
          year: badi_date.year,
          month: badi_date.month,
          day: badi_date.day
        }
      rescue
      end
    end
  end
end
