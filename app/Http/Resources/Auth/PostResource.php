<?php

namespace App\Http\Resources\Auth;

use App\Http\Resources\CategoryResource;
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
            'id' => $this->id,
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
    }
}
