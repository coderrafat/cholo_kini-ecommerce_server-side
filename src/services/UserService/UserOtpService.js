const UserOtpSend = async (otp, email, DataModel) => {
    await DataModel.updateOne({ email: email }, { $set: { otp: otp } }, { upsert: true });
};

module.exports = UserOtpSend;