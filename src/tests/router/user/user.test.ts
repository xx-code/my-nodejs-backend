import UserRequest from "../../../router/user/User";

test('hash password function not be null', async () => {
    const userRequest = new UserRequest();
    const hashCode = await userRequest.hashPassword('new password');
    expect(hashCode).not.toBeNull();
});
