import React, { useState } from 'react';
import useSignUpForm from '../hooks/LoginHooks';
import {
    Container,
    Header,
    Button,
    Text,
    Body,
    Form,
    Item as FormItem,
    Input,
    Label,
    Title,
    Content,
} from 'native-base';
import PropTypes from 'prop-types';
import FormTextInput from '../components/FormTextInput';
import mediaAPI from '../hooks/ApiHooks';
import Constants from 'expo-constants';

const Login = (props) => {
    const [formToggle, setFormToggle] = useState(true);
    const {
        inputs,
        errors,
        handleLoginUsernameChange,
        handleLoginPasswordChange,
        handleUsernameChange,
        handlePasswordChange,
        handleConfirmChange,
        handleEmailChange,
        handleFullnameChange,
        validateOnSend,
        checkUserAvailable,
    } = useSignUpForm();

    const { signInAsync, registerAsync } = mediaAPI();
    return (
        <Container style={{ paddingTop: Constants.statusBarHeight }}>
            <Header>
                <Body>
                    <Title>Wastic</Title>
                </Body>
            </Header>
            {formToggle &&
                <Content>
                    <Form>
                        <Text>Login</Text>

                        {/* <FormItem floatingLabel> */}
                        <FormTextInput
                            autoCapitalize='none'
                            value={inputs.username}
                            placeholder='username'
                            onChangeText={handleLoginUsernameChange}
                            error={errors.username}
                        />
                        {/* </FormItem> */}
                        {/* <FormItem floatingLabel> */}
                        <FormTextInput
                            autoCapitalize='none'
                            value={inputs.password}
                            placeholder='password'
                            onChangeText={handleLoginPasswordChange}
                            error={errors.password}
                        />
                        {/* </FormItem> */}

                        <Button
                            onPress={() => {
                                signInAsync(inputs, props);
                            }}>
                            <Text>Login</Text>
                        </Button>

                        <Text>sign up here</Text>

                        <Button
                            onPress={() => {
                                setFormToggle(false);
                            }}>
                            <Text>Register</Text>
                        </Button>
                    </Form>
                </Content>
            }

            {!formToggle &&
                <Content>
                    <Form>
                        <Text>Register</Text>

                        <FormTextInput
                            autoCapitalize='none'
                            value={inputs.username}
                            placeholder='username'
                            onChangeText={handleUsernameChange}
                            onEndEditing={checkUserAvailable}
                            error={errors.username}
                        />
                        <FormTextInput
                            autoCapitalize='none'
                            value={inputs.password}
                            placeholder='password'
                            onChangeText={handlePasswordChange}
                            error={errors.password}
                        />
                        <FormTextInput
                            autoCapitalize='none'
                            value={inputs.confirm}
                            placeholder='confirm password'
                            onChangeText={handleConfirmChange}
                            error={errors.confirm}
                        />
                        <FormTextInput
                            autoCapitalize='none'
                            value={inputs.email}
                            placeholder='email'
                            onChangeText={handleEmailChange}
                            error={errors.email}
                        />
                        <FormTextInput
                            value={inputs.fullname}
                            placeholder='fullname'
                            onChangeText={handleFullnameChange}
                        />
                        <Button
                            onPress={() => {
                                if (validateOnSend()) {
                                    registerAsync(inputs, props);
                                }
                            }}>
                            <Text>Register</Text>
                        </Button>

                        <Text>or</Text>

                        <Button
                            onPress={() => {
                                setFormToggle(true);
                            }}>
                            <Text>Login</Text>
                        </Button>
                    </Form>
                </Content>
            }
        </Container>
    );
}


Login.propTypes = {
    navigation: PropTypes.object,
};

export default Login;