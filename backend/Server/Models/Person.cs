using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Api_tutorial.Models
{
    public class Person
    {
       //It works!!!!!
        public string Email { get; set; } 
        public string password { get; set; }
        public Person(string email,string password1)
        {
            Email = email;
            password =password1;
        }
    }
}