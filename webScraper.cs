﻿using AngleSharp;
using AngleSharp.Dom;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace webscrapper
{
    class Program
    {
        //static void Main(string[] args)
        //{
        //    // Setup the configuration to support document loading
        //    var config = Configuration.Default.WithDefaultLoader();
        //    // Load the names of all The Big Bang Theory episodes from Wikipedia
        //    var address = "https://en.wikipedia.org/wiki/List_of_The_Big_Bang_Theory_episodes";
        //    // Asynchronously get the document in a new context using the configuration
        //    var document = BrowsingContext.New(config).OpenAsync(address).Result;
        //    // This CSS selector gets the desired content
        //    var cellSelector = "tr.vevent td:nth-child(3)";
        //    // Perform the query to get all cells with the content
        //    var cells = document.QuerySelectorAll(cellSelector);
        //    // We are only interested in the text - select it with LINQ
        //    var titles = cells.Select(m => m.TextContent);
        //    foreach (var title in titles)
        //    {
        //        Console.WriteLine(title);
        //    }
        //}

        static void Main(string[] args)
        {
            Console.OutputEncoding = System.Text.Encoding.UTF8;
            var config = Configuration.Default.WithDefaultLoader();
            var address = "http://www.hanzicraft.com/character/累";
            //var address = "view-source:http://hskhsk.pythonanywhere.com/radicals?hsk=16";
            var document = BrowsingContext.New(config).OpenAsync(address).Result;
            var cellSelector = "div.decomptitle";
            var decomptitle =
                document.QuerySelectorAll(cellSelector)// every element that matches the selector
                .Where(elem => elem.TextContent.StartsWith("Radical"))
                .First();


            var parsedItems =
                decomptitle.NextElementSibling
                .Children
                .Select(node => new
                {
                    Component = node.QuerySelector("a").TextContent,
                    Definition = Regex.Replace(
                        node.QuerySelector(".smaller-font").TextContent,
                        @"^\s*\(|\)\s*$",
                        "")
                })
                .ToArray();

            foreach (var item in parsedItems)
                Console.WriteLine(item);


            var outputString =
                String.Join(
                    ", ",
                    parsedItems
                    .Select(node =>
                        $"{node.Component}: {node.Definition}"
                    )
                    .ToArray()
                );

            Console.WriteLine(outputString);


        }


    }

}