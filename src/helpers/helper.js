module.exports = {
    response: (res, result, status, err, jumlah)=>{
        let resultprint = {}
        if(status !== 200){
            resultprint.status = 'Failed';
            resultprint.status_code = status;
            resultprint.result = result;
            resultprint.total = jumlah
            resultprint.err = err||null;
            return res.status(resultprint.status_code).json(resultprint);
        }
        resultprint.status = 'Success';
        resultprint.status_code = status;
        resultprint.result = result;
        resultprint.err = err||null;
        return res.status(resultprint.status_code).json(resultprint);
    },

}