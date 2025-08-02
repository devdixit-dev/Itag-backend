
export const EmailTemp = async (personalDetails, liabilities, investments, insurances) => {
  const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>I Tag Financials</title>
    <title>Client Financial Summary</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f5f7fa; font-family: Arial, sans-serif; color: #333;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f7fa; padding: 40px 0;">
      <tr>
        <td align="center">
          <table width="90%" cellpadding="0" cellspacing="0" style="max-width: 800px; background-color: #ffffff; border: 1px solid #ddd; border-radius: 6px; overflow: hidden;">
            <!-- Logo -->
            <tr>
              <td align="center" style="padding: 30px 0; background-color: #002e5b;">
                <img src="" alt="Company Logo" style="max-width: 180px;" />
              </td>
            </tr>

            <!-- Main content -->
            <tr>
              <td style="padding: 30px;">
                <h2 style="text-align: center; color: #002e5b; margin-bottom: 30px;">Client Financial Summary</h2>

                <!-- Personal Details -->
                <h3 style="color: #002e5b; border-bottom: 1px solid #ccc; padding-bottom: 8px;">Personal Details</h3>
                <p><strong>Full Name:</strong> ${personalDetails.fullName}</p>
                <p><strong>Email:</strong> ${personalDetails.email}</p>
                <p><strong>Mobile Number:</strong> ${personalDetails.mobileNumber}</p>
                <p><strong>Employment Type:</strong> ${personalDetails.employmentType}</p>
                <p><strong>Source of Income:</strong> ${personalDetails.sourceOfIncome}</p>
                <p><strong>Monthly Income:</strong> ₹${personalDetails.monthlyIncome}</p>
                <p><strong>Annual Dividend Income:</strong> ₹${personalDetails.annualDividendIncome}</p>
                <p><strong>Annual Rent/Interest Income:</strong> ₹${personalDetails.annualRentInterestIncome}</p>
                <p><strong>Annual Bonus/Gift Income:</strong> ₹${personalDetails.annualBonusGiftIncome}</p>
                <p><strong>NPS Scheme:</strong> ${personalDetails.npsScheme}</p>
                <p><strong>Annual NPS Amount:</strong> ₹${personalDetails.annualNpsAmount}</p>

                <!-- Liabilities -->
                <h3 style="color: #002e5b; border-bottom: 1px solid #ccc; padding-bottom: 8px;">Liabilities</h3>
                <p><strong>Loan Type:</strong> ${liabilities.loanType}</p>
                <p><strong>Loan Amount:</strong> ₹${liabilities.loanAmount}</p>
                <p><strong>Monthly EMI:</strong> ₹${liabilities.emi}</p>
                <p><strong>Duration Left:</strong> ${liabilities.durationLeft}</p>
                <p><strong>Interest Rate:</strong> ${liabilities.interestRate}%</p>

                <!-- Investments -->
                <h3 style="color: #002e5b; border-bottom: 1px solid #ccc; padding-bottom: 8px;">Investments</h3>
                <p><strong>Investment Type:</strong> ${investments.investmentType}</p>
                <p><strong>Current Value:</strong> ₹${investments.currentValue}</p>

                <!-- Insurances -->
                <h3 style="color: #002e5b; border-bottom: 1px solid #ccc; padding-bottom: 8px;">Insurances</h3>
                <p><strong>Insurance Type:</strong> ${insurances.insuranceType}</p>
                <p><strong>Annual Premium:</strong> ₹${insurances.annualPremium}</p>
                <p><strong>Coverage Amount:</strong> ₹${insurances.coverageAmount}</p>
                <p><strong>Additional Details:</strong> ${insurances.additionalDetails}</p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding: 20px; background-color: #002e5b; color: #fff; text-align: center;">
                <p style="margin: 0;">&copy; 2025 <strong>I Tag Financials</strong>. All rights reserved.</p>
                <p style="margin: 5px 0 0; font-size: 12px;">This is an automated email. Please do not reply.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`

  return html
}