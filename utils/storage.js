export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const clearUser = () => {
  localStorage.removeItem('user');
};

export const getProfile = () => {
  const profile = localStorage.getItem('profile');
  return profile ? JSON.parse(profile) : null;
};

export const setProfile = (profile) => {
  localStorage.setItem('profile', JSON.stringify(profile));
};

export const getMeals = () => {
  const meals = localStorage.getItem('meals');
  return meals ? JSON.parse(meals) : [];
};

export const setMeals = (meals) => {
  localStorage.setItem('meals', JSON.stringify(meals));
};

export const getMetrics = () => {
  const metrics = localStorage.getItem('metrics');
  return metrics ? JSON.parse(metrics) : [];
};

export const setMetrics = (metrics) => {
  localStorage.setItem('metrics', JSON.stringify(metrics));
};

export const getReminders = () => {
  const reminders = localStorage.getItem('reminders');
  return reminders ? JSON.parse(reminders) : [];
};

export const setReminders = (reminders) => {
  localStorage.setItem('reminders', JSON.stringify(reminders));
};
