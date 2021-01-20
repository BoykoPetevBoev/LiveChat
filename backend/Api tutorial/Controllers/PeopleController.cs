using Api_tutorial.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Api_tutorial.Controllers
{
    public class PeopleController : ApiController
    {
        List<Person> people = new List<Person>();
        public PeopleController()
        {
           
        }
       /* [Route("api/people/GetFirsName")]
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
        public List<Person> Get()
        {
            return people;
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
            Debug.WriteLine(value.password);

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
