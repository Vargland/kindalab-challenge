<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class FoodTruckController extends Controller {
    public function index(Request $request) {
        $params = $request->only(["fooditems"]);
        $searchParams = [];

        if ($request->has("fooditems")) {
            $searchParams = ['$q' => $params['fooditems']];
        }

        $response = Http::withQueryParameters($searchParams)->get('https://data.sfgov.org/resource/rqzj-sfat.json');
        
        return $response;
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id) {
        HistoryRecord::create([  
                "truck_name" => $request->input('name')
            ]);
    }

}
