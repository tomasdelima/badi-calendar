require 'rails_helper'
require 'csv'

RSpec.describe BadiDate, type: :model do
  let(:gregorian_date) { Date.new(2016, 1, 1) }
  let(:badi_date) { BadiDate.new(172, gregorian_date) }
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

  describe '#to_gregorian' do
    context 'when the date is between New-Year and Naw-Ruz' do
      let(:gregorian_date) { Date.new(2016, 1, 10) }

      it 'returns the correct date' do
        expect(badi_date.to_gregorian).to eq gregorian_date
      end
    end

    context 'when the date is between Naw-Ruz and New-Year' do
      let(:gregorian_date) { Date.new(2016, 6, 10) }

      it 'returns the correct date' do
        expect(badi_date.to_gregorian).to eq gregorian_date
      end
    end
  end

  describe '[BULK TEST] #day, #month, #year' do
    let(:file_name) { 'naw-ruz.csv' }

    context 'calculating the Naw-Ruz dates' do
      it 'sets the correct day, month and year' do
        file.map do|row|
          badi_date = BadiDate.new(row['b-year'], Date.new(row['g-year'], row['g-month'], row['g-day']))

          expect(badi_date.day).to eq row['b-day']
          expect(badi_date.month).to eq row['b-month']
          expect(badi_date.year).to eq row['b-year']
        end
      end
    end

    # context 'calculating the Nineteen Days Feasts dates' do
    #   let(:file_name) { 'ninteen-days-feast.csv' }

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

  describe '#gregorian_year' do
    context 'when the date is between New-Year and Naw-Ruz' do
      let(:gregorian_date) { Date.new(2016, 1, 10) }

      it 'returns the correct date' do
        expect(badi_date.gregorian_year).to eq gregorian_date.year
      end
    end

    context 'when the date is between Naw-Ruz and New-Year' do
      let(:gregorian_date) { Date.new(2016, 6, 10) }

      it 'returns the correct date' do
        expect(badi_date.gregorian_year).to eq gregorian_date.year
      end
    end

    context '' do
      it '' do
      end
    end
  end

  describe '#' do
    context '' do
      it '' do
      end
    end
  end

  describe '#' do
    context '' do
      it '' do
      end
    end
  end

  describe '#' do
    context '' do
      it '' do
      end
    end
  end

  describe '#' do
    context '' do
      it '' do
      end
    end
  end
end
