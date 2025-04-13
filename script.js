document.addEventListener('DOMContentLoaded', () => {
  const API_KEY = 'e15cb94bfc82ff671da48184';
  const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

  const currencyList = {
    USD: 'us',
    CAD: 'ca',
    EUR: 'eu',
    INR: 'in',
    GBP: 'gb',
    AUD: 'au',
    JPY: 'jp',
    CNY: 'cn',
    KRW: 'kr',
    ZAR: 'za',
    BRL: 'br',
    MXN: 'mx',
    RUB: 'ru',
    SGD: 'sg',
    AED: 'ae',
    CHF: 'ch',
    SEK: 'se',
    NZD: 'nz',
    GHS: 'gh',
    NGN: 'ng',
    KES: 'ke',
    DKK: 'dk',
    NOK: 'no',
    PKR: 'pk',
    THB: 'th',
    MYR: 'my',
    PHP: 'ph',
    IDR: 'id',
    TWD: 'tw',
    TRY: 'tr',
    HKD: 'hk',
    BDT: 'bd',
    PLN: 'pl',
    HUF: 'hu',
    CZK: 'cz',
    SAR: 'sa',
    ILS: 'il',
    ARS: 'ar',
    CLP: 'cl',
    COP: 'co',
    EGP: 'eg',
    MAD: 'ma',
    GMD: 'gm',
    UGX: 'ug',
    LKR: 'lk',
    VND: 'vn',
    BGN: 'bg',
    RON: 'ro',
    HRK: 'hr',
    ISK: 'is',
    UAH: 'ua',
    QAR: 'qa',
    JOD: 'jo',
    KWD: 'kw',
    BHD: 'bh',
    OMR: 'om',
    TND: 'tn',
    DZD: 'dz',
    GEL: 'ge',
    AMD: 'am',
    AZN: 'az',
    KZT: 'kz',
    UZS: 'uz',
    MNT: 'mn',
    MUR: 'mu',
    MVR: 'mv',
    LBP: 'lb',
    IRR: 'ir',
    IQD: 'iq',
    SYP: 'sy',
    SDG: 'sd',
    LYD: 'ly',
    YER: 'ye',
    ETB: 'et'
  };

  const fromSelect = document.getElementById('from-currency');
  const toSelect = document.getElementById('to-currency');
  const fromFlag = document.getElementById('from-flag');
  const toFlag = document.getElementById('to-flag');

  function populateCurrencies() {
    Object.keys(currencyList).forEach(code => {
      const option1 = new Option(code, code);
      const option2 = new Option(code, code);
      fromSelect.appendChild(option1);
      toSelect.appendChild(option2);
    });

    fromSelect.value = 'USD';
    toSelect.value = 'INR';
    updateFlags();
  }

  function updateFlags() {
    const fromCode = fromSelect.value;
    const toCode = toSelect.value;
    fromFlag.src = `https://flagcdn.com/48x36/${currencyList[fromCode]}.png`;
    toFlag.src = `https://flagcdn.com/48x36/${currencyList[toCode]}.png`;
  }

  fromSelect.addEventListener('change', updateFlags);
  toSelect.addEventListener('change', updateFlags);

  async function fetchRates() {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      return data.conversion_rates;
    } catch (err) {
      alert('Error fetching rates!');
      return null;
    }
  }

  document.getElementById('convert-btn').addEventListener('click', async () => {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = fromSelect.value;
    const toCurrency = toSelect.value;

    if (isNaN(amount)) {
      alert("Please enter a valid amount.");
      return;
    }

    const rates = await fetchRates();
    if (rates) {
      const rate = rates[toCurrency] / rates[fromCurrency];
      const result = amount * rate;
      document.getElementById('converted-amount').value = result.toFixed(2);
    }
  });

  document.getElementById('mode-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });

  populateCurrencies();
});
