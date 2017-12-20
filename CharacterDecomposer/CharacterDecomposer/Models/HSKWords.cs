using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CharacterDecomposer.Models
{
    public class HSKWords
    {
        public int Id { get; set; }
        public string Word { get; set; }
        public int Hsklevel { get; set; }

        public override string ToString()
        {
            return $"{Hsklevel}: {Word}";
        }
    }
}