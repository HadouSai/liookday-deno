export default {
    async authorization(context: any) {
        const authorization = context.request.headers.get('authorization');
        console.log(authorization);
        return false;
    }
}