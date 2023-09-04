exports.BrandList = async (req, res, next) => {
    try {


        return res.status(200).json({ status: 'Success' });
    } catch (error) {
        console.log(error);
    }
}