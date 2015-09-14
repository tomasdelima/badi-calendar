class BadiDate
  attr_accessor :year, :month, :day

  def initialize(year, month, day)
    @year = year
    @month = month
    @day = day
  end

  def to_s
    "#{year}-#{month}-#{day}"
  end

  def inspect
    "#{day} #{month_name} #{year} BE"
  end

  def ==(date)
    if date.class == BadiDate
      this = self
    elsif date.class == Date
      this = to_gregorian
    else
      raise ArgumentError, "Wrong argument class: #{date.class}. Only BadiDate allowed."
    end
    ['day', 'month', 'year'].all? {|var| this.send(var) == date.send(var) }
  end

  def to_gregorian
    @gregorian_date ||= if month < 19
      Date.naw_ruz_date_for(year + 1843) + days_since_last_naw_ruz
    else
      Date.naw_ruz_date_for(year + 1844) - days_until_next_naw_ruz
    end
  end

  def month_name
    {1=>"Bahá",2=>"Jalál",3=>"Jamál",4=>"‘Aẓamat",5=>"Núr",6=>"Raḥmat",7=>"Kalimát",8=>"Kamál",9=>"Asmá’",10=>"‘Izzat",11=>"Mashíyyat",12=>"‘Ilm",13=>"Qudrat",14=>"Qawl",15=>"Masá’il",16=>"Sharaf",17=>"Sulṭán",18=>"Mulk",19=>"‘Alá’",20=>"Ayyám-i-Há",nil=>"Ayyám-i-Há",}[month]
  end

  private

    def days_since_last_naw_ruz
      (month - 1) * 19 + day - 1
    end

    def days_until_next_naw_ruz
      20 - day unless month < 19
    end

    def self.naw_ruz_day_for(year)
      {172=>21,173=>20,174=>20,175=>21,176=>21,177=>20,178=>20,179=>21,180=>21,181=>20,182=>20,183=>21,184=>21,185=>20,186=>20,187=>20,188=>21,189=>20,190=>20,191=>20,192=>21,193=>20,194=>20,195=>20,196=>21,197=>20,198=>20,199=>20,200=>21,201=>20,202=>20,203=>20,204=>21,205=>20,206=>20,207=>20,208=>21,209=>20,210=>20,211=>20,212=>21,213=>20,214=>20,215=>20,216=>20,217=>20,218=>20,219=>20,220=>20,221=>20}[year]
    end

    def self.new_year_date_for(year)
      day = 23 - naw_ruz_day_for(year)
      BadiDate.new(year, 16, day)
    end
end
