<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'guid' => $this->guid,
            'slug' => $this->slug,
            'title' => $this->title,
            'description' => $this->description,
            'text' => $this->text,
            'imageUrl' => config('app.url') . 'storage/files/' . $this->image->name,
            'categories' =>  CategoryResource::collection($this->categories),
            'user' =>  $this->user->name,
            'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->created_at)->toFormattedDateString()
        ];
        //return parent::toArray($request);
    }
}
