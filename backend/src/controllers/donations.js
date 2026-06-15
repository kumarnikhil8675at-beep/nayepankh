import Donation from '../models/Donation.js';

// @desc    Process a simulated donation
// @route   POST /api/donations
// @access  Public (Optional Authentication)
export const createDonation = async (req, res) => {
  try {
    const { name, email, phone, amount, purpose, paymentMethod } = req.body;

    if (!name || !email || !phone || !amount || !purpose || !paymentMethod) {
      return res.status(400).json({ message: 'Please provide all donation fields' });
    }

    // Generate a simulated transaction ID
    const transactionId = 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase();

    const donationData = {
      name,
      email,
      phone,
      amount: Number(amount),
      purpose,
      paymentMethod,
      transactionId,
      status: 'Completed'
    };

    // If user is authenticated, link the donation to their profile
    if (req.user) {
      donationData.user = req.user._id;
    }

    const donation = await Donation.create(donationData);

    res.status(201).json({
      success: true,
      message: 'Donation processed successfully',
      donation
    });
  } catch (error) {
    res.status(500).json({ message: 'Error processing donation', error: error.message });
  }
};

// @desc    Get all donations (Admin only)
// @route   GET /api/donations
// @access  Private/Admin
export const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find({})
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving donations', error: error.message });
  }
};
