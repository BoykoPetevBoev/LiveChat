using Api_tutorial.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Api_tutorial.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    
    public class PeopleController : ApiController
    {
        List<Person> people = new List<Person>();
        public PeopleController()
        {
            people.Add(new Person("Boiko", "rino"));
            people.Add(new Person("Boiko", "rino"));


            people.Add(new Person("Boiko", "rino"));
            people.Add(new Person("Boiko", "rino"));
        }
        /*[Route("api/people/GetFirsName")]
        [HttpGet]
        public List<string> GetFirsname()
        {
            List<string> output = new List<string>();
            foreach (var item in people)
            {
                output.Add(item.FirstName);
            }
            return output;
        }*/
        // GET: api/People
        public Person Get()
        {
            return people[0];
            
        }

        // GET: api/People/5
       /* public Person Get(int id)
        {
            return people.Where(x => x.Gmail == id).FirstOrDefault();
        }*/

        // POST: api/People
        public void Post(Person value)
        {
            people.Add(value);
            Debug.WriteLine(value.Email ,value.password);

        }

        // PUT: api/People/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/People/5
        public void Delete(int id)
        {
        }
    }
}
