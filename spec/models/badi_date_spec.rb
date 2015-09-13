require 'rails_helper'
require 'csv'

RSpec.describe BadiDate, type: :model do
  let(:years) { (172..220) }
  # let(:gregorian_date) { Date.new(2015, 9, 3) }
  let(:badi_date) { BadiDate.new(172, 9, 15) }
  let(:file) {
    raw_data = File.read(Rails.root.join("spec/uhj-reduced-dates/#{file_name}"))
    data = CSV.parse(raw_data, headers: true)
    data.map {|row| row.map {|k,v| row[k] = v.to_i} }
    data
  }

  it 'responds to day, month and year' do
    expect(badi_date).to respond_to(:day)
    expect(badi_date).to respond_to(:month)
    expect(badi_date).to respond_to(:year)
  end

  describe '[BULK TEST] #to_gregorian' do
    # let(:gregorian_date) { Date.new(2016, 2, 7) }
    # let(:badi_date) { BadiDate.new(172, 18, 1) }
    let(:file_name) { 'nineteen-days-feasts.csv' }

    it 'returns the correct date' do
      years.map do |year|
        day_field = "#{BadiDate.naw_ruz_day_for(year)}-march-nawruz-g-day"
        month_field = "#{BadiDate.naw_ruz_day_for(year)}-march-nawruz-g-month"

        file.map do |row|
          badi_date = BadiDate.new(year, row['b-month'], row['b-day'])
          gregorian_date = Date.new(badi_date.gregorian_year, row[month_field], row[day_field])
          # puts("badi: #{badi_date}, gregorian: #{gregorian_date}")
          # expect(badi_date.to_gregorian).to eq gregorian_date
          if !(badi_date.to_gregorian == gregorian_date)
            debugger
          end
        end
      end
    end
  end

  # describe '#to_gregorian' do
  #   context 'when the date is between New-Year and Naw-Ruz' do
  #     let(:gregorian_date) { Date.new(2016, 2, 7) }
  #     let(:badi_date) { BadiDate.new(172, 18, 1) }

  #     it 'returns the correct date' do
  #       expect(badi_date.to_gregorian).to eq gregorian_date
  #     end
  #   end

  #   context 'when the date is between Naw-Ruz and New-Year' do
  #     let(:gregorian_date) { Date.new(2015, 4, 9) }
  #     let(:badi_date) { BadiDate.new(172, 2, 1) }

  #     it 'returns the correct date' do
  #       expect(badi_date.to_gregorian).to eq gregorian_date
  #     end
  #   end
  # end

  # describe '#last_naw_ruz_date' do
  #   # context 'when its a 21'
  #   it 'returns the date of the last Naw Ruz' do
  #     expect(badi_date.last_naw_ruz_date).to eq BadiDate.new(172, 1, 1)
  #   end
  # end

  describe '[BULK TEST] #day, #month, #year' do
    let(:file_name) { 'naw-ruz.csv' }

    context 'calculating the Naw-Ruz dates' do
      it 'sets the correct day, month and year' do
        file.map do|row|
          badi_date = BadiDate.new(row['b-year'], row['b-month'], row['b-day'])

          expect(badi_date.day).to eq row['b-day']
          expect(badi_date.month).to eq row['b-month']
          expect(badi_date.year).to eq row['b-year']
        end
      end
    end

    # context 'calculating the Nineteen Days Feasts dates' do
    #   let(:file_name) { 'nineteen-days-feasts.csv' }

    #   context 'for a year in which Nar-Ruz falls on 21 March' do
    #     it 'sets the correct day, month and year' do
    #       file.map do|row|
    #         # b-day,b-month,20-march-nawruz-g-day,21-march-nawruz-g-day,20-march-nawruz-g-month,21-march-nawruz-g-month


    #         badi_date = BadiDate.new(Date.new(2015, row['g-month'], row['g-day']))

    #         expect(badi_date.day).to eq row['b-day']
    #         expect(badi_date.month).to eq row['b-month']
    #         expect(badi_date.year).to eq row['b-year']
    #       end
    #     end
    #   end
    # end
  end

  describe '[BULK TEST] #gregorian_day, #gregorian_month, #gregorian_year' do
    context 'calculating the Naw-Ruz dates' do
      let(:file_name) { 'naw-ruz.csv' }

      it 'returns the correct gegorian day, month and year' do
        file.map do|row|
          badi_date = BadiDate.new(row['b-year'], row['b-month'], row['b-day'])

          expect(badi_date.gregorian_day).to eq row['g-day']
          expect(badi_date.gregorian_month).to eq row['g-month']
          expect(badi_date.gregorian_year).to eq row['g-year']
        end
      end
    end

    context 'calculating the Nineteen Days Feasts dates' do
      let(:file_name) { 'nineteen-days-feasts.csv' }

      it 'returns the correct gegorian day, month and year' do
        years.map do |year|
          day_field = "#{BadiDate.naw_ruz_day_for(year)}-march-nawruz-g-day"
          month_field = "#{BadiDate.naw_ruz_day_for(year)}-march-nawruz-g-month"

          file.map do |row|
            badi_date = BadiDate.new(year, row['b-month'], row['b-day'])
            gregorian_date = Date.new(badi_date.gregorian_year, row[month_field], row[day_field])
            # expect(badi_date.gregorian_day).to eq row[day_field]
            if !(badi_date.gregorian_day == row[day_field])
              debugger
            end
            expect(badi_date.gregorian_month).to eq row[month_field]
            # expect(badi_date.gregorian_year).to eq year + 1843
          end
        end
      end
    end
  end

  describe '.last_naw_ruz_date_for' do
    # context 'when its a 21'
    it 'returns the Naw Ruz date for the year' do
      expect(BadiDate.naw_ruz_date_for(172)).to eq BadiDate.new(172, 1, 1)
    end
  end

  # describe '#gregorian_year' do
  #   context 'when the date is between New-Year and Naw-Ruz' do
  #     let(:gregorian_date) { Date.new(2016, 1, 10) }

  #     it 'returns the correct date' do
  #       expect(badi_date.gregorian_year).to eq gregorian_date.year
  #     end
  #   end

  #   context 'when the date is between Naw-Ruz and New-Year' do
  #     let(:gregorian_date) { Date.new(2016, 6, 10) }

  #     it 'returns the correct date' do
  #       expect(badi_date.gregorian_year).to eq gregorian_date.year
  #     end
  #   end

  #   context '' do
  #     it '' do
  #     end
  #   end
  # end

  # describe '#' do
  #   context '' do
  #     it '' do
  #     end
  #   end
  # end

  # describe '#' do
  #   context '' do
  #     it '' do
  #     end
  #   end
  # end

  # describe '#' do
  #   context '' do
  #     it '' do
  #     end
  #   end
  # end

  # describe '#' do
  #   context '' do
  #     it '' do
  #     end
  #   end
  # end
end
