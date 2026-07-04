/**            -----------------------------------
 * @file       frontend/fsuy_site/app/components/GamePreview.tsx
 * @brief      A carousel-like component for displaing news.
 * @date       07-2026
 */

"use client"

import { useEffect, useState, type ReactElement } from "react";

import { EntityNewsPreview } from "@/app/entity_interfaces";

import "@/app/styles/components/NewsCarousel.css";

interface NewsCarouselParams {
    carousel_news: EntityNewsPreview[];
    frame_interval: number;
}

export function NewsCarousel({carousel_news, frame_interval} : NewsCarouselParams): ReactElement {
    const [index, set_index] = useState<number>(0);

    function goto(i: number) {
        set_index((i + carousel_news.length) % carousel_news.length);
    }

    useEffect(() => {
        const interval_id = setInterval(() => goto(index + 1), frame_interval);
        return () => clearInterval(interval_id);
    }, [index, frame_interval]);

    return (
        <div className="carousel">
        
        <div className="carousel_slider_wrapper">
            <div 
                className="carousel_slider"
                style={{transform: `translateX(calc(-${index} * (var(--carousel_image_width) + var(--carousel_slider_gap)))`}}
            >
                {
                carousel_news.map((news, i) => (
                    <a href={`/news/${news.pid}`} key={i}>
                    <div className="frame" key={i}>
                        <img src={news.cover} alt={`news_${news.pid}_cover`} />
                        <h3> {news.title} </h3>
                        <span> {news.timestamp} </span>
                    </div>
                    </a>
                ))
                }
            </div>
            
            {index !== 0 ?
                <button className="carousel_prev" onClick={() => goto(index - 1)}> {"◀"} </button>
                : null
            }
            {index !== (carousel_news.length - 1) ?
                <button className="carousel_next" onClick={() => goto(index + 1)}> {"▶"} </button>
                : null
            }
        </div>


        <div className="carousel_progress">
        {
            carousel_news.map((_, i) => (
                <button
                    key={i}
                    className={`tab ${i === index ? "active" : ""}`}
                    onClick={() => (goto(i))}
                >  </button>
            ))
        }
        </div>

        </div>
    );
}