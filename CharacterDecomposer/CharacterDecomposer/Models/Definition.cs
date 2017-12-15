using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CharacterDecomposer.Models
{
    public class Definition
    {
        public string Romanization { get; set; }
        public string[] Definitions { get; set; }
        public override string ToString()
        {
            return $"{Romanization}： {String.Join("/", Definitions)} ";
        }
    }
}