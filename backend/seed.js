const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Plan = require('./models/Plan');
const User = require('./models/User');
const Policy = require('./models/Policy');
const Claim = require('./models/Claim');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/insuranceDB')
  .then(() => console.log('MongoDB Connected for Seeding'))
  .catch(err => console.error(err));

const seedData = async () => {
  try {
    await User.deleteMany();
    await Plan.deleteMany();
    await Policy.deleteMany();
    await Claim.deleteMany();
    console.log('Cleared ALL data. Fresh database.');

    await Plan.insertMany([
      { title: 'Premium Term Life Insurance', category: 'life', description: 'Up to 15% online discount. ₹1 Crore life cover starting at just ₹490/month. No medical test required up to age 45. Tax benefit under Section 80C.', premiumAmount: 490, coverageAmount: 10000000, durationYears: 10 },
      { title: 'Standard Term Life Plan', category: 'life', description: 'Affordable cover for young families. ₹50 Lakh coverage at just ₹280/month. Accidental death rider available. Tax benefit under 80C.', premiumAmount: 280, coverageAmount: 5000000, durationYears: 15 },
      { title: 'Comprehensive Health Insurance', category: 'health', description: 'Up to 25% discount. Network of 10,000+ cashless hospitals across India. Pre & post hospitalization cover included.', premiumAmount: 800, coverageAmount: 500000, durationYears: 1 },
      { title: 'Family Health Floater', category: 'health', description: '25% family discount. Floater plan — spouse + 2 children covered. Maternity cover included. Daycare procedures covered.', premiumAmount: 1500, coverageAmount: 1000000, durationYears: 1 },
      { title: 'Investment Plan (ULIP)', category: 'other', description: 'In-built life cover + market-linked growth. Guaranteed returns + equity exposure. Lock-in only 5 years. Tax-free maturity.', premiumAmount: 2500, coverageAmount: 1500000, durationYears: 5 },
      { title: 'Car Insurance (Bumper-to-Bumper)', category: 'car', description: 'Lowest price guarantee. Instant renewal. Zero depreciation cover. 24x7 roadside assistance across India.', premiumAmount: 3500, coverageAmount: 2000000, durationYears: 1 },
      { title: 'Two Wheeler Insurance', category: 'bike', description: 'Up to 85% discount. Own damage + third party cover. ₹15 Lakh personal accident cover included.', premiumAmount: 700, coverageAmount: 100000, durationYears: 1 },
      { title: 'Travel Insurance (India + Intl)', category: 'travel', description: 'Domestic & international travel cover. Flight cancellation, baggage loss, medical emergency — all covered.', premiumAmount: 299, coverageAmount: 5000000, durationYears: 1 },
      { title: "Women's Term Insurance", category: 'life', description: '20% cheaper premiums for women. Critical illness cover included. Pregnancy complication cover. Income benefit rider.', premiumAmount: 390, coverageAmount: 10000000, durationYears: 10 },
      { title: 'Child Savings Plan', category: 'other', description: 'Premium waiver benefit. Secure your child\'s education & future milestones. Guaranteed maturity benefit.', premiumAmount: 1200, coverageAmount: 2500000, durationYears: 15 },
      { title: 'Retirement Pension Plan', category: 'other', description: 'Guaranteed monthly pension after retirement. Annuity + life cover. Tax benefit under Section 80CCC.', premiumAmount: 5000, coverageAmount: 5000000, durationYears: 20 }
    ]);
    console.log('✅ Created 11 Insurance Plans');
    console.log('✅ Database is FRESH — No users, no admins. Register manually!');
    process.exit(0);
  } catch (error) { console.error('Seeding Error:', error); process.exit(1); }
};
seedData();
