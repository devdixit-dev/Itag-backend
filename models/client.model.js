import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
  personalDetails: {
    fullName: {
      type: String
    },
    email: {
      type: String
    },
    mobileNumber: {
      type: String
    },
    finalGoalAmount: {
      type: Number
    },
    employmentType: {
      type: String,
    },
    sourceOfIncome: {
      type: String
    },
    monthlyIncome: {
      type: Number
    },
    annualDividendIncome: {
      type: Number
    },
    annualRentInterestIncome: {
      type: Number
    },
    annualBonusGiftIncome: {
      type: Number
    },
    npsScheme: {
      type: String
    },
    annualNpsAmount: {
      type: Number
    }
  },
  liabilities: [{
    loanType: {
      type: String,
    },
    loanAmount: {
      type: Number
    },
    emi: {
      type: Number
    },
    durationLeft: {
      type: Number
    },
    interestRate: {
      type: Number
    }
  }],
  investments: [{
    investmentType: {
      type: String,
    },
    amount: {
      type: Number
    }
  }],
  insurances: [{
    insuranceType: {
      type: String,
    },
    premium: {
      type: Number
    },
    coverage: {
      type: Number
    },
    details: {
      type: String
    }
  }],
  summary: {
    bufferAmount: {
      type: Number
    },
    totalIncome: {
      type: Number
    },
    totalInsurance: {
      type: Number
    },
    totalInvestments: {
      type: Number
    },
    totalLiabilities: {
      type: Number
    }
  }
}, {timestamps: true});

const Client = mongoose.model('Client', ClientSchema);

export default Client;