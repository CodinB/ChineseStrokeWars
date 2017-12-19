using CharacterDecomposer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CharacterDecomposer.Controllers
{
    [RoutePrefix("api/dictionary")]
    [AllowAnonymous]
    public class DictionaryController : ApiController
    {
        readonly DictionaryService dictionaryService;

        public DictionaryController()
        {
            this.dictionaryService = new DictionaryService();
        }

        [HttpGet,Route]
        public HttpResponseMessage DictionaryLookUp(string entry)
        {
            return Request.CreateResponse(HttpStatusCode.OK, dictionaryService.DictionaryLookUp(entry));
        }
    }
}
