/* eslint-disable */

const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 5000);
};

const login = async (email, password) => {
  try {
    console.log(email, password);
    const response = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password,
      },
    });
    if (response.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

const loginForm = document.querySelector('.form--login');
if (loginForm) {
  document.querySelector('.form--login').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

const logout = async () => {
  try {
    const response = await axios({
      method: 'GET',
      url: '/api/v1/users/logout',
    });
    if (response.data.status === 'success') {
      location.reload(true);
    }
  } catch (err) {
    showAlert('error', 'error log out ,try again !');
  }
};

const logoutBtn = document.getElementById('btn');
if (logoutBtn) {
  document.querySelector('.nav__el--logout').addEventListener('click', logout);
}

//type is either 'password' or 'data'
const updateSettings = async (data, type) => {
  try {
    console.log(showAlert);
    const url =
      type === 'password'
        ? '/api/v1/users/updateMyPassword'
        : '/api/v1/users/updateMe';
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });
    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} update successfully!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

const userData = document.querySelector('.form-user-data');
if (userData) {
  userData.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    console.log(form);
    updateSettings(form, 'data');
  });
}

const formUserPassword = document.querySelector('.form-user-password');
if (formUserPassword) {
  formUserPassword.addEventListener('submit', async (e) => {
    e.preventDefault();
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password',
    );
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

const stripe = Stripe(
  'pk_test_51NaG8tKjUVHNr8QMcwoSR29acd1QTyjfKpilrnAPIhStkGeZnaNdY905QPWvahKY5f05G4MjVipHoCHJST5iBthg00C1ES3XBN',
);
const bookTour = async (tourId) => {
  try {
    //1) get checkout session from api
    const session = await axios({
      method: 'GET',
      url: `/api/v1/booking/checkout-session/${tourId}`,
      data: {},
    });
    console.log(session);
    //2) Create checkout form + charge credit  card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('err', err);
  }
};

const bookTourBtn = document.getElementById('book-tour');
if (bookTourBtn) {
  bookTourBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}
