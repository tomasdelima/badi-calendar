load 'date.rb'

class BadiDate
  # def initialize(gregorian_date=Date.today)
  #   @gregorian_date = gregorian_date
  # end

  def initialize(year, month, gregorian_date)
  # def initialize(year, month, day)
    # @gregorian_date = self.to_gregorian
    @gregorian_date = gregorian_date
    @year = year
    @month = month
  end

  def inspect
    "#{day} #{month_name} #{year} BE"
  end

  def to_gregorian
    # gregorian_day =
    # gregorian_month =
    # gregorian_year =
    @gregorian_date
  end

  def day
    @day ||= if(days_since_last_naw_ruz < 19 * 18)
      days_since_last_naw_ruz % 19 + 1
    else
      20 - days_until_next_naw_ruz
    end
  end

  def month
    @month ||= if(days_since_last_naw_ruz < 19 * 18)
      days_since_last_naw_ruz / 19 + 1
    else
      (days_until_next_naw_ruz - 1) / 19 + 19
    end
  end

  def year
    # year_shift = (gregorian_date >= Date.naw_ruz_date_for(gregorian_year)) ? 0 : -1
    # @year ||= gregorian_year - 1843 + year_shift
    @year
  end

  def month_name
    {
      1  => "Bahá",
      2  => "Jalál",
      3  => "Jamál",
      4  => "‘Aẓamat",
      5  => "Núr",
      6  => "Raḥmat",
      7  => "Kalimát",
      8  => "Kamál",
      9  => "Asmá’",
      10 => "‘Izzat",
      11 => "Mashíyyat",
      12 => "‘Ilm",
      13 => "Qudrat",
      14 => "Qawl",
      15 => "Masá’il",
      16 => "Sharaf",
      17 => "Sulṭán",
      18 => "Mulk",
      19 => "‘Alá’",
      20 => "Ayyám-i-Há",
    }[month]
  end

  def last_naw_ruz_date
    year_shift = (gregorian_date >= BadiDate.naw_ruz_date_for(year)) ? 0 : -1
    BadiDate.naw_ruz_date_for(year + year_shift)
  end

  def next_naw_ruz_date
    year_shift = (gregorian_date >= BadiDate.naw_ruz_date_for(year)) ? 1 : 0
    BadiDate.naw_ruz_date_for(year + year_shift)
  end

  def days_since_last_naw_ruz
    (gregorian_date - last_naw_ruz_date).to_i
  end

  def days_until_next_naw_ruz
    (next_naw_ruz_date - gregorian_date).to_i
  end

  def self.naw_ruz_day_for(year)
    {172=>21,173=>20,174=>20,175=>21,176=>21,177=>20,178=>20,179=>21,180=>21,181=>20,182=>20,183=>21,184=>21,185=>20,186=>20,187=>20,188=>21,189=>20,190=>20,191=>20,192=>21,193=>20,194=>20,195=>20,196=>21,197=>20,198=>20,199=>20,200=>21,201=>20,202=>20,203=>20,204=>21,205=>20,206=>20,207=>20,208=>21,209=>20,210=>20,211=>20,212=>21,213=>20,214=>20,215=>20,216=>20,217=>20,218=>20,219=>20,220=>20,221=>20}[year]
  end

  def self.naw_ruz_date_for(year)
    Date.new(year + 1843, 3, naw_ruz_day_for(year))
  end

  def >(date)
    self.to_gregorian > (date.class == Date ? date : date.to_gregorian)
  end

  def <(date)
    self.to_gregorian < (date.class == Date ? date : date.to_gregorian)
  end



  # private

  def gregorian_date
    @gregorian_date
  end

  def gregorian_year
    1843 + year + (self > BadiDate.naw_ruz_date_for(year) ? 1 : 0)
  end

  def gregorian_month
    if(days_since_last_naw_ruz < 19 * 18)
      days_since_last_naw_ruz / 19 + 1
    else
      (days_until_next_naw_ruz - 1) / 19 + 19
    end
  end
end
