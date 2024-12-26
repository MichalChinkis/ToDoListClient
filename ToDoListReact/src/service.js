import axios from 'axios';


// הגדרת Config Defaults
axios.defaults.baseURL = 'http://localhost:5206'; // כתובת בסיס
axios.defaults.headers.common['Content-Type'] = 'application/json'; // כותרת תוכן

axios.interceptors.response.use(
  (response) => {
    console.log('Response Interceptor:', response);
    return response; // מחזיר את התגובה כפי שהיא
  },
  (error) => {
    if (!error.response) {
      console.error('Network error:', error.message);
    } else {
      console.error('API error:', {
        status: error.response.status,
        data: error.response.data,
      });
    }
    return Promise.reject(error); // מעביר את השגיאה הלאה
  }
);


export default {
  getTasks: async () => {
    const result = await axios.get(`/items`)    
    return result.data;
  },

  addTask: async (name) => {
    console.log('addTask', name);
  
    const result = await axios.post(`/items`,  name, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    return result.data;
  },

  setCompleted: async (id, isComplete) => {
    console.log('setCompleted', { id, isComplete });
    
    try {
      const result = await axios.put(`/items/${id}`, { isComplete: isComplete }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      return result.data;
    } catch (error) {
      console.error('Error in setCompleted:', error.response?.data || error.message);
      throw error;
    }
  },
  
  deleteTask:async(id)=>{
    console.log('deleteTask')
    const result = await axios.delete(`/items/${id}`)
    return result.data;
  }
};
